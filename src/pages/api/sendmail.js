import { createTransport } from "nodemailer";
const key = process.env.key;
const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.email,
        pass: key
    },
});

const sendContactForm = async (req, res) => {
    const { data } = req.body;
    let message = `<h2>Aadhar Card Information Received</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Watermark:</strong> ${data.watermark ? 'Yes' : 'No'}</p>
    <p><strong>Aadhar Number:</strong> ${data.aadharNumber}</p>
    <p><strong>Address:</strong> ${data.address}</p>
    <p><strong>Hindi Name:</strong> ${data.hindiName}</p>
    <p><strong>Gender:</strong> ${data.gender}</p>
    <p><strong>Father's Name:</strong> ${data.father}</p>
    <p><strong>Date of Birth:</strong> ${data.dob}</p>
    <p><strong>Hindi Address:</strong> ${data.hindiAddress}</p>`
    const mailOption = {
        from: `${data.name} <${process.env.email}>`,
        to: process.env.admin,
        subject:`New Aadhar Generated`,
        html: message
    };
    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            return res.json({success:false, msg:err.message})
        }
        return res.json({ success: true, info });
    });

}
export default sendContactForm;