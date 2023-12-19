@extends('layouts.stream')

@section('title', 'ボタンのページ')

@section('content')
    <div id="winner"> <!-- whitespace-nowrapを追加 -->
        <!-- 勝者がここに表示されます -->
    </div>
    <div id="player-score" class="absolute top-10 left-0 right-0 text-center text-2xl z-10 hidden md:block">
        <!-- スコアがここに表示されます -->
    </div>
    <!-- プログレスバー -->
    <div class="fixed top-[60px] left-0 w-full z-10">
        <div class="sm:max-w-md mx-auto h-[8px] px-4">
            <div id="progress-bar-area"></div>
{{--            <div class="w-full sm:max-w-md mx-auto bg-gray-200 text-white h-full flex items-center rounded-full">--}}
{{--                <div id="progressBar0" class="absolut bg-[#F59E0B] w-full h-[8px] rounded-full"></div>--}}
{{--            </div>--}}
{{--            <div class="w-full sm:max-w-md mx-auto bg-gray-200 text-white h-full flex items-center rounded-full">--}}
{{--                <div id="progressBar1" class="absolut bg-[#F59E0B] w-full h-[8px] rounded-full"></div>--}}
{{--            </div>--}}
        </div>
    </div>

    <div class="flex flex-col justify-center items-center h-full pt-20">
        <div class="pb-6">
            <input placeholder="Player Name" type="text" id="player" class="rounded border-2 border-gray-600 p-3">
        </div>
        <div class="pb-6">
            <button id="streamButton"
                    class="bg-red-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                アタタタター
            </button>
        </div>
    </div>
@endsection
