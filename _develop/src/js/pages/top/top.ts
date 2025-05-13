export default class Index {
  /**
   * Creates an instance of Index.
   */
  constructor() {
    this.toastAnimation();
    this.heartShow();
    this.modal();
    this.playAudio();
  }

  private toastAnimation = () => {
    const icon = document.querySelector('.send-love figure') as any;
    const toast = document.querySelector('.toast') as any;
    function triggerEffect() {
      if (!toast) return;

      // Show toast
      toast.style.opacity = '0';

      setTimeout(() => {
        toast.style.opacity = '1';
      }, 2000); // toast disappears after 4 giây (trước là 2 giây)
    }

    // Trigger effect mỗi 8 giây (trước là 5 giây)
    setInterval(triggerEffect, 6000);

    function iconEffect() {
      icon.style.animation = 'none';
      void icon.offsetWidth; // trigger reflow
      icon.style.animation = 'shake 0.3s';
    }

    setInterval(iconEffect, 2000);
  };

  private heartShow = () => {
    setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'heartShow';
      heart.innerHTML = '❤️';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.fontSize = Math.random() * 10 + 10 + 'px';
      heart.style.animationDuration = 6 + Math.random() * 2 + 's';

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5000);
    }, 800);
  };

  private modal = () => {
    const modal = document.querySelector('.modal-overlay') as any;
    const openBtn = document.querySelector('.send-love figure') as any;

    openBtn.addEventListener('click', function () {
      modal.classList.add('show');
      console.log(1);
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        modal.classList.remove('show');
      }
    });
  };

  private playAudio = () => {
    const audio = document.getElementById('wedding-audio') as HTMLAudioElement | null;
    if (!audio) return;

    const imgToggle = document.querySelector('.toggle-audio-img') as HTMLImageElement | null;

    const startAudio = (): void => {
      audio
        .play()
        .then(() => {
          // Nếu audio bắt đầu phát thành công, cập nhật ảnh toggle
          if (imgToggle) {
            imgToggle.src = '/assets/images/music_player.gif';
          }
        })
        .catch((err) => {
          console.warn('Không thể phát nhạc:', err);
        });

      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
    };

    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio);

    if (imgToggle) {
      imgToggle.addEventListener('click', (event) => {
        // Ngăn sự kiện lan ra ngoài để tránh gọi lại startAudio
        event.stopPropagation();

        if (audio.paused) {
          imgToggle.src = '/assets/images/music_player.gif';

          audio.play().catch((err) => {
            console.warn('Không thể phát nhạc:', err);
          });
        } else {
          audio.pause();
          imgToggle.src = '/assets/images/music_player.png';
        }
      });
    }
  };
}

window.addEventListener('DOMContentLoaded', () => {
  new Index();
});
