import Factura from './factura.model.js';
import Usuario from '../user/user.model.js';
import Productos from '../productos/productos.model.js';
import fs from "fs";
import PDFDocument from "pdfkit";
import path from 'path';

export const editarFactura = async (req, res) => {
    try{
        const {fid} = req.params;
        const {productos} = req.body;
        let {metodoPago} = req.body;

        const factura = await Factura.findById(fid);
        if (!factura) {
            return res.status(404).json({
                success: false,
                message: "Factura no encontrada"
            });
        }

        const usuarioCompleto = await Usuario.findById(factura.usuario);
        if (!usuarioCompleto) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        let total = 0;  
        let productosCarrito = [];

        for (let item of productos) {
            const producto = await Productos.findById(item.producto);
            if (!producto) {
                return res.status(404).json({
                    success: false,
                    message: `Producto con ID ${item.producto} no encontrado`
                });
            }
            const productoEnFactura = factura.productos.find(p => p.producto.toString() === item.producto);
            
            if (productoEnFactura) {
                const cantidadAnterior = productoEnFactura.cantidad;
                producto.stock += cantidadAnterior;  

                if (producto.stock < item.cantidad) {
                    return res.status(400).json({
                        success: false,
                        message: `No hay suficiente stock para el producto ${producto.nombre}. Stock disponible: ${producto.stock}`
                    });
                }

                producto.stock -= item.cantidad;  
            } else {
                if (producto.stock < item.cantidad) {
                    return res.status(400).json({
                        success: false,
                        message: `No hay suficiente stock para el producto ${producto.nombre}. Stock disponible: ${producto.stock}`
                    });
                }
                producto.stock -= item.cantidad; 
            }
            await producto.save();
            total += producto.precio * item.cantidad;

            productosCarrito.push({
                producto: producto._id,
                nombre: producto.nombre,
                cantidad: item.cantidad,
                precio: producto.precio
            });
        }
        
        if(metodoPago !== undefined){
            factura.productos = productosCarrito;
            factura.total = total;
            factura.metodoPago = metodoPago;
            await factura.save();
            if(metodoPago !== "TARJETA" && metodoPago !== "EFECTIVO"){
                return res.status(400).json({
                    success: false,
                    message: "Método de pago no válido"
                });
            }
        }
        if (!metodoPago) {
            factura.productos = productosCarrito;
            factura.total = total;
            metodoPago = factura.metodoPago;
            await factura.save();
        }
        const doc = new PDFDocument();
        const dir = './facturasEditadas';
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const pdfPath = path.join(dir, `facturaEditada_${fid}.pdf`);

        doc.pipe(fs.createWriteStream(pdfPath));

        doc.fontSize(18).text('Factura de Compra', { align: 'center' });
        doc.moveDown();

        doc.fontSize(12).text(`Fecha: ${new Date(factura.fechaCompra).toLocaleString()}`);
        doc.text(`Usuario: ${usuarioCompleto.nombre} ${usuarioCompleto.apellido}`);
        doc.text(`NIT: ${usuarioCompleto.nit}`);
        doc.text(`Método de pago: ${factura.metodoPago}`);

        doc.moveDown();

        doc.text('Productos:', { underline: true });
        factura.productos.forEach((item, index) => {
            doc.text(`- Producto ${index + 1}: ${item.nombre} - ${item.cantidad} x $${item.precio}`);
        });

        doc.moveDown();

        doc.text(`Total: $${factura.total}`);

        doc.moveDown();
        doc.end();

            return res.status(200).json({
            success: true,
            message: "Factura actualizada con éxito y se encuentra en el directorio de facturas editadas",
            factura
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al editar la factura",
            error: err.message
        })
    }
}

export const listarFacturasUsuario = async (req, res) => {
    try{
        const {uid} = req.params;
        const user = await Usuario.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }
        const facturas = await Factura.find({ usuario: uid }).populate('productos.producto');

        if (!facturas || facturas.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron facturas para este usuario"
            });
        }
        const facturasConProductos = facturas.map(factura => {
            const productos = factura.productos.map(item => ({
                nombre: item.producto.nombre,  
                cantidad: item.cantidad,       
                precio: item.precio,           
                total: item.precio * item.cantidad  
            }));

            return {
                _id: factura._id,
                fechaCompra: factura.fechaCompra,
                metodoPago: factura.metodoPago,
                total: factura.total,
                productos: productos
            };
        });

        return res.status(200).json({
            success: true,
            message: "Facturas obtenidas con éxito",
            facturas: facturasConProductos
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar las facturas",
            error: err.message
        })
    }
}