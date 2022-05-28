(function() {
    function Animat(odj, data) {
        data = data || {};
        this.odj = odj;
        this.time = data.time || 0.5;
        this.direction = data.direction || 'left';
        this.shape = data.shape || 'width';
        this.length = data.length || 100;
        this.reduction = data.redu || false;
        this.loop = data.loop || false;
        this.boxLeft = odj.offsetLeft;
        this.boxTop = odj.offsetTop;
        this.boxWidth = odj.offsetWidth;
        this.boxHeigth = odj.offsetHeight;
    }

    //移动动画
    Animat.prototype.move = function() {
        let num = this;

        this.odj.style.transitionDuration = this.time + 's';

        if (this.direction == 'top') {
            this.odj.style.top = this.boxTop + this.length + 'px';
        } else if (this.direction == 'left') {
            this.odj.style.left = this.boxLeft + this.length + 'px';
        };

        if (this.reduction) {
            setTimeout(function() {
                if (num.direction == 'top') {
                    num.odj.style.top = num.boxTop + 'px';
                } else if (num.direction == 'left') {
                    num.odj.style.left = num.boxLeft + 'px';
                }
            }, num.time * 1000);
        };

        if (this.loop) {
            let ding = setInterval(function() {
                num.move();
                clearTimeout(ding);
            }, (num.time * 2) * 1000)
        }
    };

    //变形动画
    Animat.prototype.variant = function() {
        let num = this;

        this.odj.style.transitionDuration = this.time + 's';

        if (this.shape == 'width') {
            this.odj.style.width = this.boxWidth + num.length + 'px';
        } else if (this.shape == 'height') {
            this.odj.style.height = this.boxHeigth + num.length + 'px';
        };

        if (this.reduction) {
            setTimeout(function() {
                if (num.shape == 'width') {
                    num.odj.style.width = num.boxWidth + 'px';
                } else if (num.shape == 'height') {
                    num.odj.style.height = num.boxHeigth + 'px';
                }
            }, num.time * 1000);
        };

        if (this.loop) {
            let ding = setInterval(function() {
                num.variant();
                clearTimeout(ding);
            }, (num.time * 2) * 1000)
        }
    };

    //淡入淡出
    Animat.prototype.hide = function(data) {
        let num = this;
        let temp = 0;
        let time;

        clearTimeout(time);
        time = setInterval(() => {
            if (temp <= 100) {
                if (data) {
                    num.odj.style.opacity = 1;
                    num.odj.style.opacity = (100 - temp) / 100;
                } else {
                    num.odj.style.display = 'block';
                    num.odj.style.opacity = 0;
                    num.odj.style.opacity = temp / 100;
                }
                temp++;
            } else {
                clearTimeout(time);
                temp = 0;
                if (data) {
                    num.odj.style.display = 'none';
                }
            }
        }, (num.time * 1000) / 100)
    }

    //暴露在window对象下
    window.Animat = Animat;
})();