<?php
require_once 'core.php';

if ($_REQUEST['quiz'] AND $_REQUEST['load'] == true) {

    $quiz_list = json_decode(file_get_contents('quiz.json'), true);

    echo json_encode(array(
        'quiz' => $quiz_list[$_REQUEST['quiz']],
        'session' => $_SESSION['quiz'][$_REQUEST['quiz']]['answers']
    ));

    exit;

}

if (
    $_REQUEST['quiz'] AND
    $_POST['save'] == true AND
    isset($_POST['quiz'])
) {

    $_SESSION['quiz'][$_REQUEST['quiz']]['answers'][intval($_POST['question'])]['answer'] =
        intval($_POST['player_answer']);

    print('<pre>');print_r($_SESSION['quiz'][$_REQUEST['quiz']]['answers']);print('</pre>');

    exit;

}

unset($_SESSION['quiz']);

 ?>