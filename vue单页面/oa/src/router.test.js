const router = require("./router")
// @ponicode
describe("router.createRouter", () => {
    test("0", () => {
        let callFunction = () => {
            router.createRouter()
        }
    
        expect(callFunction).not.toThrow()
    })
})
