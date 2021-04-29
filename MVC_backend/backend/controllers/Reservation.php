<?php

require_once '../vendor/autoload.php';

class Reservation extends Controller
{

    public $data = [];

    public function __construct()
    {
        $this->userModel = $this->model('ReservationModel');
    }

    public function byId(){
        $headers = apache_request_headers();
        $headers = isset($headers['Authorization']) ? explode(' ', $headers['Authorization']) : null;
        $cin = $this->verifyAuth($headers[1]);
        $cin = $cin->cin;
        if($headers){
            try {
                $reservations = $this->getMyReservation($cin);
                print_r(json_encode($reservations));
            } catch (\Throwable $th) {
                //throw $th;
            }
        }
    }


}
