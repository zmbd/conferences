<?php

namespace App\Http\Controllers;

use App\Models\Conference;
use App\Models\User;
use Illuminate\Http\Request;

class ConferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $conferences = Conference::latest()->paginate(10);
        return response()->json($conferences);
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
    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);
    
        $conference = new Conference($request->all());
        $conference->date = now();
        $conference->user_id = auth()->id();
        $conference->save();
    
        return response()->json(['message' => 'Conference created successfully', 'conference' => $conference], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Conference  $conference
     * @return \Illuminate\Http\Response
     */
    public function show(Conference $conference)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Conference  $conference
     * @return \Illuminate\Http\Response
     */
    public function edit(Conference $conference)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Conference  $conference
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Conference $conference) {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);
    
        if (auth()->id() !== $conference->user_id && !auth()->user()->is_admin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
    
        $conference->update($request->all());
    
        return response()->json(['message' => 'Conference updated successfully', 'conference' => $conference]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Conference  $conference
     * @return \Illuminate\Http\Response
     */
    public function destroy(Conference $conference) {
        if (auth()->id() !== $conference->user_id && !auth()->user()->is_admin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
    
        $conference->delete();
    
        return response()->json(['message' => 'Conference deleted successfully'], 200);
    }
}