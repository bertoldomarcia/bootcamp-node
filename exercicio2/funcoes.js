module.exports = (x) => {
    const par = () => {
        return x % 2 === 0
    };

    return {
        msg: 'O valor é par?',
        valor: par()
    };
};