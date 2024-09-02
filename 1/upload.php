<?php

function getResult($result, $message, $count = null, $lines = null): string
{
    $arr = [
        'result' => $result,
        'message' => $message,
    ];
    if ($result) {
        $arr['count'] = $count;
        $arr['lines'] = $lines;
    }
    return json_encode($arr, true);
}

try {
    $path = './files/';
    if (
        !isset($_FILES['file']['error']) ||
        is_array($_FILES['file']['error'])
    ) {
        throw new RuntimeException('Ошибка');
    }

    switch ($_FILES['file']['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            throw new RuntimeException(getResult(false, 'Файл не отправлен.'));
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            throw new RuntimeException(json_encode(getResult(false, 'Превышен предельный размер файла.')));
        default:
            throw new RuntimeException(getResult(false, 'Непонятно, но что то пошло не так.'));
    }

    if ($_FILES['file']['size'] > 1000000) {
        throw new RuntimeException(getResult(false, 'Превышен предельный размер файла.'));
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    if (false === $ext = array_search(
            $finfo->file($_FILES['file']['tmp_name']),
            array(
                'txt' => 'text/plain',
            ),
            true
        )) {
        throw new RuntimeException(json_encode(getResult(false, 'Не  правильный формат файла.')));
    }

    if (!move_uploaded_file(
        $_FILES['file']['tmp_name'],
        sprintf($path . $_FILES['file']['name'],
            sha1_file($_FILES['file']['tmp_name']),
            $ext
        )
    )) {
        throw new RuntimeException(json_encode(getResult(false, 'Не удалось переместить загруженный файл.')));
    }


    $file = $path . $_FILES['file']['name'];
    $linecount = 0;
    $handleFile = fopen($file, "r");
    $lines = [];
    while (!feof($handleFile)) {
        $line = fgets($handleFile);
        preg_match_all('/\d/', $line, $out);
        $linecount++;
        array_push($lines, $linecount . '. ' . $line . ' = ' . count($out[0]));
    }

    fclose($handleFile);

    echo getResult(true, 'Фаил успешно загружен.', $linecount, $lines);
} catch (RuntimeException $e) {
    echo getResult(false, $e->getMessage());
}