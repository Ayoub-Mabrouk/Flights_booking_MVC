<?php


spl_autoload_register(function ($className) {
    require_once 'config/' . $className . '.php';
});

