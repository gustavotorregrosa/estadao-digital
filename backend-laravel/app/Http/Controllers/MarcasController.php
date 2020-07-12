<?php

namespace App\Http\Controllers;

use App\Models\Marca;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MarcasController extends Controller
{


    public function __construct()
    {
        $this->middleware('jwt');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $marcas = Marca::orderBy('nome')->get();
        return respostaCors($marcas, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validacao = Validator::make($request->all(), [
            'nome' => 'required|unique:marca',
        ]);

        if ($validacao->fails()) {
            return respostaCors([], 422, "Nome de marca inválido ou repetido");
        }

        Marca::create([
            'nome' => $request->nome
        ]);

        return respostaCors([], 200, "Marca " . $request->nome . " adicionada");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            $id = $request->id;
            $novoNome = $request->nome;
            $marca = Marca::findOrFail($id);
            $nomeAntigo = $marca->nome;
            if ($novoNome == $nomeAntigo) {
                return respostaCors([], 202, "Nao houve mudanca no nome da marca");
            }

            $validacao = Validator::make($request->all(), [
                'nome' => 'required|unique:marca',
            ]);

            if ($validacao->fails()) {
                return respostaCors([], 422, "Nome de marca inválido ou repetido");
            }

            $marca->nome = $novoNome;
            $marca->save();
            return respostaCors([], 200, "Marca " . $nomeAntigo . " alterada para ".$novoNome);

        } catch (Exception $e) {
            return respostaCors([], $e->getCode(), "Exceção: ".$e->getMessage());
            
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        try {

            $marca = Marca::findOrFail($id);
            $nome = $marca->nome;

            if($marca->carros->count()){
                return respostaCors([], 406, "Há carros cadastrados com a marca " . $nome);
            }
        
            $marca->delete();
            return respostaCors([], 200, "Marca " . $nome . " deletada ");

        } catch (Exception $e) {
            return respostaCors([], $e->getCode(), "Exceção: ".$e->getMessage());
            
        }
    }
}
