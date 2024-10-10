<?php
$subdomain = 'dmikim'; //Поддомен нужного аккаунта
$link = 'https://' . $subdomain . '.amocrm.ru/api/v4/leads/complex'; //Формируем URL для запроса
$long_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIyYTk5YzliN2Q0YjkxMmRjYjA0YWE0YzllZjQ2MWVhMWJmZDFlZGUwY2EwMmNmMzY5ZTJjYWYzN2YwYTFlNGQ4NGJmMzQ2NTE4NzMwNTAyIn0.eyJhdWQiOiIwMjYxNmI3ZS03NzI1LTQxMGUtYTYyMy05MGNmYTNiZmJhMjEiLCJqdGkiOiIyMmE5OWM5YjdkNGI5MTJkY2IwNGFhNGM5ZWY0NjFlYTFiZmQxZWRlMGNhMDJjZjM2OWUyY2FmMzdmMGExZTRkODRiZjM0NjUxODczMDUwMiIsImlhdCI6MTcyODU4MTE2NywibmJmIjoxNzI4NTgxMTY3LCJleHAiOjE4ODYyODQ4MDAsInN1YiI6IjYyODU3NzgiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6MzAyMDI3OTIsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbImNybSIsImZpbGVzIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyIsInB1c2hfbm90aWZpY2F0aW9ucyJdLCJoYXNoX3V1aWQiOiJlMWVlMmVjOC0xNThlLTQyMzktOGFjOC1jYzQ3OGIyMjlmZjUiLCJhcGlfZG9tYWluIjoiYXBpLWIuYW1vY3JtLnJ1In0.pt_W_mhFihUjf4JzABsMHZrA1PY__4sv-HV6m-0mywL1mfV8400pZdjI0YOzSN4RO6fH0IaEd4SJW2ab93-Y8pXnkla4SWmiE6ZsNC84Htu6q70VM-l7Zgt3u1GDniHo68DKbN2VsjgVVKpLVUd2bL16EDDf3mEpBfxLU_WmWTvdopyU2oWDQbbKPaZG4myFuQMa_N_SewFmm_x5gjEtZo6lPqPXhouauP97WdEPvdLQNY7d7AwVQqhpKOn-o2kiMwONCXOTKi7kIgVU99aqEgoXyGNJVOSURPKK1vuDBxfMACqcL3WOEN4hZbxU_9Uaa2wFI4SXN61amyltLXJB6Q';

$headers = [
    'Authorization: Bearer ' . $long_token
];

if (!empty($_POST['name']) && $_POST['phone']) {

    /** Соберем данные для запроса */
    $data = [
        [
            "name" => "Заявка из сайта",
            "_embedded" => [
                "contacts" => [
                    [
                        "first_name" => $_POST['name'],
                        "created_at" => time(),
                        "updated_by" => 0,
                    ]
                ],
                "companies" => [
                    [
                        "name" => 'Rano Eco',
                    ]
                ]
            ],
            "created_at" => time(),
            "custom_fields_values" => [
                [
                    'field_id' => 1159669,
                    'values' => [
                        [
                            'value' => '+'.$_POST['phone'],
                        ]
                    ],
                ]
            ],
        ]
    ];

    /**
     * Нам необходимо инициировать запрос к серверу.
     * Воспользуемся библиотекой cURL (поставляется в составе PHP).
     * Вы также можете использовать и кроссплатформенную программу cURL, если вы не программируете на PHP.
     */
    $curl = curl_init(); //Сохраняем дескриптор сеанса cURL
    /** Устанавливаем необходимые опции для сеанса cURL  */
    curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-oAuth-client/1.0');
    curl_setopt($curl,CURLOPT_URL, $link);
    curl_setopt($curl,CURLOPT_HTTPHEADER,['Content-Type:application/json']);
    curl_setopt($curl,CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl,CURLOPT_HEADER, false);
    curl_setopt($curl,CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl,CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, 1);
    curl_setopt($curl,CURLOPT_SSL_VERIFYHOST, 2);
    $out = curl_exec($curl); //Инициируем запрос к API и сохраняем ответ в переменную
    $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    /** Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом. */
    $code = (int)$code;
    $errors = [
        400 => 'Bad request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not found',
        500 => 'Internal server error',
        502 => 'Bad gateway',
        503 => 'Service unavailable',
    ];

    try
    {
        /** Если код ответа не успешный - возвращаем сообщение об ошибке  */
        if ($code < 200 || $code > 204) {
            throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undefined error', $code);
        }
    }
    catch(\Exception $e)
    {
        die('Ошибка: ' . $e->getMessage() . PHP_EOL . 'Код ошибки: ' . $e->getCode());
    }

    /**
     * Данные получаем в формате JSON, поэтому, для получения читаемых данных,
     * нам придётся перевести ответ в формат, понятный PHP
     */

    $response = json_decode($out, true);

} else {
    die('Ошибка: ' . 'Телефон или Имя обезательно заполнить' . PHP_EOL . 'Код ошибки: ' . 422);
}