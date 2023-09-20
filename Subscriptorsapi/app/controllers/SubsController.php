<?php

namespace App\Controllers;
use App\Models\SubDB; 


/** Tomado de https://www.youtube.com/watch?v=Z5YQc7FhXyU */

class SubsController extends Controller {

    // Éste método es para acceder a todos los registos de la tabla Subs -> recupera los datos de la tabla y los muestra en un formato JSON
    public function index() {
        // recupero los registros de la tabla subs
        $dataSubs = SubDB::all();
        response()->json($dataSubs);
        // response()->json(['message' => 'You should see the subs here']);
    }

    public function subById($id) {
        $dataSubs = SubDB::find($id);
        response()->json($dataSubs);
    }

    // public function add() {
    //     // creo un subscriptor nuevo (vacío) para poder a éste meterle datos
    //     $sub = new SubDB;

    //     // necesitamos saber si hay información para crear este nuevo sub
    //     echo app()->request()->get('nick');

    //     // obtenemos los datos que nos ha enviado en cliente y con ellos llenamos los campos requerido
    //     $sub->nick=app()->request()->get('nick');
    //     $sub->months=app()->request()->get('months');
    //     $sub->profilerURl=app()->request()->get('profilerURl');
    //     $sub->description=app()->request()->get('description');

    //     $sub->save();

    //     response()->json(['message' => 'New Subscriptor created']);
    // }
}

