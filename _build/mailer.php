<?php
  // include_once 'MailChimp.php';

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $service = join(", ", $_REQUEST["service"]);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);
        $subscribe = join(", ", $_REQUEST["subscribe"])

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR empty($service) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! Looks like something's missing. Check everything and then hit submit again!";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "general@madebyporter.com";

        // Set the email subject.
        $subject = "A $service Inquiry from $name";

        // Build the email content.
        $email_content = "Name: $name\n\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Service: $service\n\n";
        $email_content .= "Message:\n$message\n\n";
        $email_content .= "Subscribe: $subscribe\n\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

        // if (isset($_POST['subscribe'])) {
        //   use \DrewM\MailChimp\MailChimp;
        //   $MailChimp = new MailChimp('77b30e548ae154657523a4bdcb9165e7-us9')
                       
        //   // Your List Unique ID: http://admin.mailchimp.com/lists/ (Click "settings")
        //   $list_id = "2a32fa7a33";
        //   $result = $MailChimp->post("lists/$list_id/members", [
        //       'email_address' => $email,
        //       'merge_fields'  => ['Name'=>$name],
        //       'status'        => $subscribe,
        //   ]);
        //   if ($MailChimp->success()) {
        //       console.log($result);   
        //   } else {
        //       echo $MailChimp->getLastError();
        //   } 
        // }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }