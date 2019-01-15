const jwt = require('jsonwebtoken');
// ===========
// Verificar token
// ===========
let verificaToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    messahe: 'Token no válido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

// ===========
// Verifica adminRole
// ===========
let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    console.log(usuario);
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                messahe: 'Usuario no autorizado'
            }
        });
    }
}

module.exports = {
    verificaToken,
    verificaAdmin_Role
};