<?php

require_once '../vendor/autoload.php';

class User extends Controller
{

    public $data = [];

    public function __construct()
    {
        $this->userModel = $this->model('UserModel');
    }

    public function user($data)
    {
        $headers = apache_request_headers();
        $headers = isset($headers['Authorization']) ? explode(' ', $headers['Authorization']) : null;
        if ($headers) {
            try {

                $this->verifyAuth($headers[1]);
                if ($data == 'Admin' || $data == 'Client') {
                    $user = $this->userModel->getUserByRole($data);
                    unset($user->password);
                    print_r(json_encode($user));
                } else {
                    $user = $this->userModel->getUserById($data);
                    unset($user->password);
                    print_r(json_encode($user));
                }
            } catch (\Throwable $th) {
                print_r(json_encode(array(
                    "error" => "unauthorized",
                )));
            }
        } else {
            http_response_code(401);
            print_r(json_encode(array(
                "error" => "unauthorized",
            )));
        }
    }


    public function users($data)
    {
        $headers = apache_request_headers();
        $headers = isset($headers['Authorization']) ? explode(' ', $headers['Authorization']) : null;

        if ($headers) {
            try {
                $this->verifyAuth($headers[1]);

                if ($data === 'Admin' || $data === 'Client') {
                    $users = $this->userModel->getUserByRole($data);
                    foreach ($users as $user) {
                        unset($user->password);
                    }
                    print_r(json_encode($users));
                } else {
                    $users = $this->userModel->getUsers($data);
                    foreach ($users as $user) {
                        unset($user->password);
                    }
                    print_r(json_encode($users));
                }
            } catch (\Throwable $th) {
                print_r(json_encode(array(
                    "error" => "unauthorized",
                )));
            }
        } else {
            http_response_code(401);
            print_r(json_encode(array(
                "error" => "unauthorized",
            )));
        }
    }

    public function login()
    {
        $user = $this->userModel->getUserByEmail($this->data->email);
        if ($user) {
            if (password_verify($this->data->password, $user->password)) {
                $token = $this->auth($user->cin, $user->role, $user->password);
                unset($user->password);
                print_r(json_encode(array(
                    'User' => $user,
                    'Token' => $token,
                )));
            } else {
                http_response_code(401);
                print_r(json_encode(array(
                    'error' => 'email or password wrong',
                )));
            }
        }
    }

    public function register()
    {
        try {
            $this->data->password = password_hash($this->data->password, PASSWORD_DEFAULT);
            $user = $this->userModel->register($this->data);
            $token = $this->auth($user->cin, $user->role, $user->password);
            unset($user->password);
            print_r(json_encode(array(
                'User' => $user,
                'Token' => $token,
            )));
        } catch (\PDOExeption $err) {
            http_response_code(500);
            print_r(json_encode(array('error' => $err->getMessage())));
            die();
        }

    }
}
