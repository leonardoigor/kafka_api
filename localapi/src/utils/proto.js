
module.exports = () => {
    Number.prototype.delay = async function (v) {
        let t = this
        return await new Promise(function (resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
    }

}