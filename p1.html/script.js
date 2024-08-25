// script.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 300;

    const n = 20;
    const array = [];
    const socks = [];
    const margin = 30;
    const availableWidth = canvas.width - margin * 2;
    const spacing = availableWidth / n;

    const stringHeight = canvas.height * 0.45;

    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }

    for (let i = 0; i < array.length; i++) {
        const x = i * spacing + spacing / 2 + margin;
        const y = stringHeight;
        const height = canvas.height * 0.4 * array[i];
        socks[i] = new Sock(x, y, height);
    }

    const moves = bubbleSort(array);

    function Sock(x, y, height) {
        this.loc = { x, y };
        this.height = height;
        this.targetLoc = { x, y };
        this.isMoving = false;
    }

    Sock.prototype.moveTo = function(target) {
        this.targetLoc = target;
        this.isMoving = true;
    };

    Sock.prototype.draw = function(ctx) {
        if (this.isMoving) {
            const speed = 2;
            this.loc.x += (this.targetLoc.x - this.loc.x) * speed / 100;
            this.loc.y += (this.targetLoc.y - this.loc.y) * speed / 100;
            if (Math.abs(this.loc.x - this.targetLoc.x) < 1 && Math.abs(this.loc.y - this.targetLoc.y) < 1) {
                this.loc = { ...this.targetLoc };
                this.isMoving = false;
            }
        }
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.loc.x - 10, this.loc.y - this.height, 20, this.height);
        return this.isMoving;
    };

    function bubbleSort(array) {
        const moves = [];
        let swapped;
        do {
            swapped = false;
            for (let i = 1; i < array.length; i++) {
                moves.push({ indices: [i - 1, i], type: 'comparison' });
                if (array[i - 1] > array[i]) {
                    swapped = true;
                    [array[i - 1], array[i]] = [array[i], array[i - 1]];
                    moves.push({ indices: [i - 1, i], type: 'swap' });
                }
            }
        } while (swapped);
        return moves;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, stringHeight);
        ctx.lineTo(canvas.width, stringHeight);
        ctx.stroke();

        let changed = false;
        for (let i = 0; i < socks.length; i++) {
            changed = socks[i].draw(ctx) || changed;
        }

        if (!changed && moves.length > 0) {
            const nextMove = moves.shift();
            if (nextMove.type === 'swap') {
                const [i, j] = nextMove.indices;
                socks[i].moveTo(socks[j].loc);
                socks[j].moveTo(socks[i].loc);
                [socks[i], socks[j]] = [socks[j], socks[i]];
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
});

// script.js

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sideNav = document.getElementById('sideNav');
    const closeBtn = document.getElementById('closeBtn');

    menuToggle.addEventListener('click', function() {
        sideNav.style.left = '0'; // Show the side nav
    });

    closeBtn.addEventListener('click', function() {
        sideNav.style.left = '-250px'; // Hide the side nav
    });
});

