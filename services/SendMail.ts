import nodemailer from 'nodemailer';

const SendMail = {
    enviar: async (
        destinatario: string,
        assunto: string,
        texto: string,
        html: string
    ) => {

        let transporter;

        if (
            process.env.SMTP_HOST &&
            process.env.SMTP_USER &&
            process.env.SMTP_PASS
        ) {

            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT || 587),
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

        } else {

            const contaTeste =
                await nodemailer.createTestAccount();

            transporter = nodemailer.createTransport({
                host: contaTeste.smtp.host,
                port: contaTeste.smtp.port,
                secure: contaTeste.smtp.secure,
                auth: {
                    user: contaTeste.user,
                    pass: contaTeste.pass
                }
            });

        }

        const info = await transporter.sendMail({
            from: process.env.SMTP_USER || 'MPB Interativa <teste@mpb-interativa.dev>',
            to: destinatario,
            subject: assunto,
            text: texto,
            html
        });

        const previewUrl =
            nodemailer.getTestMessageUrl(info);

        if (previewUrl) {
            console.log('Preview do e-mail:', previewUrl);
        }

        return info;
    }
};

export default SendMail;