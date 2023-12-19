import './bootstrap';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
    wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
    forceTLS: import.meta.env.VITE_PUSHER_APP_FORCE_TLS ?? false, // SSLを使用していないためfalseに設定
    enabledTransports: ['ws', 'wss'], // WebSocketのみを使用する
    disabledTransports: ['sockjs'], // SockJSは無効にする
    logToConsole: import.meta.env.VITE_PUSHER_LOG_CONSOLE ?? true // コンソールにログを出力
});


document.addEventListener('DOMContentLoaded', function () {
    const streamButton = document.getElementById('streamButton');
    const playerInput = document.getElementById('player'); // プレイヤー名を入力するフォーム
    const playerScoreDiv = document.getElementById('player-score'); // スコアを表示するDIV
    const winnerDiv = document.getElementById('winner');
    const maxCount = 20;
    const progressBarArea = document.getElementById('progress-bar-area');

    let scores = {}; // 各プレイヤーのスコアを保持するオブジェクト
    let gameEnded = false; // ゲームが終了したかどうかのフラグ


    streamButton.addEventListener('click', function () {

        if (gameEnded) return;
        const playerName = playerInput.value;
        if (!playerName) {
            console.error('Player name is required');
            return;
        }

        fetch('/click', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ player: playerName }) // プレイヤー名を送信
        }).then(response => {
            if (response.ok) {
                console.log('POST successful');
            } else {
                console.error('POST failed');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    });

    window.Echo.channel('stream')
        .listen('MessageStreamed', (e) => {
            if (gameEnded) return;
            const data = JSON.parse(e.message); // JSON文字列をオブジェクトに変換
            const player = data.player;
            const clicks = data.clicks;

            if (!scores[player]) {
                scores[player] = 0;
            }
            scores[player] += clicks; // プレイヤーのスコアを更新

            // スコア表示の更新
            playerScoreDiv.innerHTML = '';
            Object.keys(scores).forEach((player, index) => {
                const progressBar = document.getElementById(`progressBar${player}`);
                if (!progressBar) {
                    progressBarArea.innerHTML += `
               <div class="text-4xl">${player}</div> <div class="w-full sm:max-w-md mx-auto bg-gray-200 text-white h-full flex items-center rounded-full mb-3">
       
        <div id="progressBar${player}" class="absolut bg-[#F59E0B] h-[8px] rounded-full"></div>
    </div>
                `;
                }
                console.log(progressBarArea);

                playerScoreDiv.innerHTML += `<p>${player}: ${scores[player]} アタタ</p>`;
                updateProgressBar(scores[player], player);
            });

            // 勝者判定
            if (scores[player] >= maxCount) {
                winnerDiv.innerHTML = `<p class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-6xl px-4 py-2 z-50 whitespace-nowrap">勝利者: ${player}</p>`;
                gameEnded = true; // ゲームを終了
            }
        });


    /**
     * Updates the progress bar based on the click count.
     * @param {number} count - The current click count.
     * @param {string} player - The player identifier.
     * @returns {void}
     */
    const updateProgressBar = (count, player) => {
        const widthPercentage = (count / maxCount) * 100;
        const progressBar = document.getElementById(`progressBar${player}`);
        if (progressBar) {
            progressBar.style.width = widthPercentage + '%';
        } else {
            console.log(`Element with id progressBar${player} not found`);
        }
    }

});
