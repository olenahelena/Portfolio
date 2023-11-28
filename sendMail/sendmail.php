<?php
   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\SMTP;
   use PHPMailer\PHPMailer\Exception; 

   require 'PHPMailer/src/Exception.php';
   require 'PHPMailer/src/PHPMailer.php';
   require 'PHPMailer/src/SMTP.php';

   $mail = new PHPMailer(true);
   $mail->CharSet = 'UTF-8';
   $mail->setLanguage('en', 'PHPMailer/language');
   $mail->IsHTML(true);

   $mail->IsSMTP(); 
   $mail->Host = 'smtp.gmail.com';
   // set the SMTP server to send through
   $mail->SMTPAuth = true;
   $mail->Username = 'olena.codes@gmail.com';
   $mail->Password = 'nnzjufelxmgmploc';
   $mail->Port = '587';
   $mail->SMTPSecure = 'TLS';

   $mail->setFrom('olena.codes@gmail.com', 'Olena');
   $mail->addAddress('lemonslice67@gmail.com');
   $mail->Subject = 'E-mail from Olena';

   // Body

   $body = '<h1>Hi! It is Code Only!</h1>';

   if(trim(!empty($_POST['name']))) {
      $body .= "<p>Name: <strong>".$_POST['name']."</strong></p>";
   }
   if(trim(!empty($_POST['email']))) {
      $body .= "<p>Email: <strong>".$_POST['email']."</strong></p>";
   }
   if(trim(!empty($_POST['message']))) {
      $body .= "<p>Message: <strong>".$_POST['message']."</strong></p>";
   }
   if(trim(!empty($_POST['like']))) {
      $body .= "<p>Do you like Code Only? <strong>".$_POST['like']."</strong></p>";
   }
   if(trim(!empty($_POST['thebest']))) {
      $body .= "<strong>what?</strong>";
   }

   // add file

   if(trim(!empty($_FILES['image']['tmp_name']))) {
      $fileTmpName = $_FILES['image']['tmp_name'];
      $fileName = $_FILES['image']['name'];
      $mail->addAttachment($fileTmpName, $fileName);
   }

   $mail->Body = $body;

   // Sending
   $mail->send();
   $mail->smtpClose();
?>