<?php
class ReservationModel
{
    public function __construct()
    {
        $this->db = new DB();
    }

    public function getMyReservation($cin)
    {
        $this->db->query("SELECT * FROM reservation WHERE Client = :Client");
        $this->db->bind(':Client', $cin);
        return $this->db->all();
    }

}
