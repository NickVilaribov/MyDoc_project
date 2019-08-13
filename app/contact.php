<?php
//проверяем значения полученые при проверке скриптом формы
if (trim($_POST['valTrFal'])!='valTrFal_true') {
	echo 'fasle';
}
else {

		$txtname = trim($_POST['txtname']);

		$txtNameValue = trim($_POST['name_class_value']);

		$txtemail = trim($_POST['txtemail']);

		$txtphone = trim($_POST['txtphone']);

		$txtmessage = trim($_POST['txtmessage']);


		$fromMail = 'vilaribov@gmail.com';
		$fromName = 'Клиент c сайта';

		$emailTo = 'vilaribov@gmail.com';

		$subject = 'Форма "Заказать звонок"';
		$subject = '=?utf-8?b?'. base64_encode($subject) .'?=';
		$headers = "Content-type: text/plain; charset=\"utf-8\"\r\n";
		$headers .= "From: ". $fromName ." <". $fromMail ."> \r\n";

		// email body
		$body = "Получено письмо с сайта wellvet.by\n\nИмя: $txtname\nТелефон: $txtphone\ne-mail: $txtemail";
		$mail = mail($emailTo, $subject, $body, $headers, '-f'. $fromMail );


		echo 'ok';
}
?>
