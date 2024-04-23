const nodemailer=require('nodemailer');
const transporter=nodemailer.createTransport( {
    service :"gmail",
    auth:{
        user: "iparkingtree@gmail.com",
        pass:"iparking2021"
    }
});
const options = {
    from:"iparkingtree@gmail.com",
    to:"znegui.chaima@gmail.com",
    subject: "Sending Email with nodejs !",
    text:"Hello ! "
};
transporter.sendMail(options,function(err,info){
    if(err){
    console.log(err);
    return }
    
        console.log("Sent :" +info.response);
})