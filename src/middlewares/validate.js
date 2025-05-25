function validate(schema) {
    return (req, res, next) => { // next() = siga o fluxo
        try {
            schema.parse(req.body); // Validando os dados passados por req.body de acordo com o Schema passado.
            next();
        } catch (err) {
            return res.status(400).json({ error: err.errors }); // Caso os dados estejam fora do esperado, vai cair nesse retorno
        }
    };
}

module.exports = validate;