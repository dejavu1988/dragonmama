$(document).ready(function() {
        var audioFinger1 = document.createElement('audio');
        audioFinger1.setAttribute('src', 'audio/shougu.mp3');
		
		var audioFinger2 = document.createElement('audio');
        audioFinger2.setAttribute('src', 'audio/dong.mp3');
		
		var audioPad1 = document.createElement('audio');
        audioPad1.setAttribute('src', 'audio/xiaogu.mp3');
		
		var audioPad2 = document.createElement('audio');
        audioPad2.setAttribute('src', 'audio/1.mp3');
        //audioFinger1.setAttribute('autoplay', 'autoplay');
        //audioElement.load()
        //$.get();
        //audioFinger1.addEventListener("load", function() {
        //audioFinger1.play();
        //}, true);

        $('#finger1').click(function() {
        audioFinger1.play();
        });

        $('#finger2').click(function() {
        audioFinger2.play();
		});
		
		$('#pad1').click(function() {
        audioPad1.play();
        });
		
		$('#pad2').click(function() {
        audioPad2.play();
        });
});		
