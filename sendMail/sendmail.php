<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '/phpailer/src/Exception.php';
require '/phpailer/src/PHPMailer.php';
require '/phpailer/src/SMTP.php';

$response = ['success' => false, 'error' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);
    
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'olena.codes@gmail.com';
        $mail->Password = 'nnzjufelxmgmploc';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';

        $mail->setFrom('olena.codes@gmail.com', 'Your Name');
        $mail->addAddress($email, $name);

        $mail->isHTML(true);
        $mail->Subject = 'Subject of the Email';
        $mail->Body = $message;

        $mail->send();

        $response['success'] = true;
    } catch (Exception $e) {
        $response['error'] = $mail->ErrorInfo;
    }
} else {
    http_response_code(405); // Method Not Allowed
    $response['error'] = 'Method Not Allowed';
}

header('Content-Type: application/json');
echo json_encode($response);

error_log('Script is executing.');  // Add this line at various points in your script

?>
