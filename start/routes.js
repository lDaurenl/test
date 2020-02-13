'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome');

Route.get('/address','AddressController.index');
Route.post('/address','AddressController.store');

Route.get('/passport','PassportController.index');
Route.post('/passport','PassportController.store');

Route.get('/job','JobController.index');
Route.post('/job','JobController.store');

Route.get('/Children','ChildrenController.index');
Route.post('/Children','ChildrenController.store');

Route.get('/client','MainController.index');
Route.delete('client/:id','MainController.destroy');
Route.patch('client/:id','MainController.update');
Route.post('/client','MainController.store');
