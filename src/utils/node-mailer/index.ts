import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nhocdl.poro11@gmail.com',
        pass: 'gshbodvabnqzssyl'
    }
})


const mailOptions = {
    from: 'nhocdl.poro11@gmail.com',
    subject: 'Verify your account',
}


export const sendMailHandler =   (HTMLContent:string, receiveEmail: string) => {
    return new Promise((resolve, reject) => {
     transporter.sendMail({...mailOptions, html:HTMLContent, to : receiveEmail }, (error: any , info: any) => {
        if (error) {
            console.log(error)
            reject(false)
        }
        else {
            resolve(true)
        }
    } )
    })
} 