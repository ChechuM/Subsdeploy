<?php

app()->get('/', function () {
    response()->json(['message' => 'Creating an API to consume data about Subscribers']);
});

app()->get('/subs', 'SubsController@index');

app()->get('/subs/{id}', 'SubsController@subById');

// app()->post('/subs', 'SubsController@add');
