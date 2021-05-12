<?php

class UserModel
{
  

    public function __construct()
    {
        $this->db = new DB();
    }

    public function getUsers()
    {
        $this->db->query("SELECT * FROM user");
        return $this->db->all();
    }

    public function getUserById($cin)
    {
        $this->db->query("SELECT * FROM user WHERE cin = :cin");
        $this->db->bind(':cin', $cin);
        return $this->db->single();
    }

    public function getUserByEmail($email)
    {
        $this->db->query("SELECT * FROM user WHERE email = :email");
        $this->db->bind(':email', $email);
        return $this->db->single();
    }

    public function getUserByRole($role)
    {
        echo $role;
        $this->db->query("SELECT * FROM user WHERE role = :role");
        $this->db->bind(':role', $role);
        return $this->db->all();
    }

    public function register($data)
    {

        try {
            $this->db->query("INSERT INTO
                user
            SET
                cin = :cin,
                first_name = :first_name,
                last_name = :last_name,
                phone = :phone,
                email = :email,
                password = :password,
                address = :address,
                updated = :updated,
                num_passport = :num_passport,
                birth_date = :birth_date,
                role = :role
            ");
            $this->db->bind(':cin', $data->cin);
            $this->db->bind(':first_name', $data->first_name);
            $this->db->bind(':last_name', $data->last_name);
            $this->db->bind(':phone', $data->phone);
            $this->db->bind(':email', $data->email);
            $this->db->bind(':password', $data->password);
            $this->db->bind(':address', $data->address);
            $this->db->bind(':updated', time());
            $this->db->bind(':num_passport', $data->num_passport);
            $this->db->bind(':birth_date', $data->birth_date);
            $this->db->bind(':role', $data->role);
            $this->db->single();
        } catch (\PDOExeption $err) {
            return $err->getMessage();
            die();
        }
        return $this->getUserById($data->cin);
    }


    
   
}
