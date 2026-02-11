const { z } =require("zod")


registrationsSchema = z.object({
    username:z.string().min(3,"min 3 character needed").max(20),
    email:z.string().email(),
    password:z.string().min(5,"minimum 5 character needed").max(20),
    bio:z.string().max(50).min(1),
    profilepic:z.string()
})



module.exports = {
    registrationsSchema
}