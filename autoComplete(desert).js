$(document).ready(function(){

	$( function() {

            function getFirstWords() { // get the 'firstWord' from content -- Array
            	let tmp = [];
            	for(let e of content)
            		tmp.push(e.firstWord);
            	return tmp;
            }

            function getNextWord(lastInputWord) { 
            // get the 'nextWord' from content depending on the word in the input values -- Array
            	let tmp = [];
           	 	for(let e of content) {
            	if(Object.is(lastInputWord, e.firstWord))
            		tmp = e.nextWord;
            	}
            	return tmp;
            }

            function getLastInputWord() { // get the last word from the input values
            	let lastBlank = lastIfBlank();
            	let valOne = valIfOne();
    			/*let lastWord;
    			let lastWordUp;*/
            	let lastWord =" ";
            	let lastWordUp = " ";
            	console.log("lastBlank:"+lastBlank+" valOne:"+valOne);
            	let val = $("#tags").val().trim();
            	if(!Object.is(val, "")) {
            		let arr = val.split(" ");
            		if(lastBlank || valOne){
            			lastWord = arr[arr.length - 1];
            		}else{
            			lastWord = arr[arr.length - 2];
            		}
            	}
            	lastWordUp = lastWord.toUpperCase();
            	return lastWordUp[0] + lastWord.substring(1, lastWord.length);           	
            }

            function valIfOne() { 
            // To determine whether the input values is a single word
            let flag;
            let val = $("#tags").val();
            let arr = val.split(" ");
            if(arr.length == 1){
            	flag = true;
            } else {
            	flag = false;
            }
            return flag;
        }

        function lastIfBlank() { 
            // To determine whether there is a space after the last word
            let flag ;
            let val = $("#tags").val();
            let arr = val.split(" ");
            let lastWord = arr[arr.length - 1];
            if(lastWord == "") {
            	flag = true;
            }else{
            	flag = false;
            }
            return flag;
        }

        function extractLast( term ) {
        	return term.split(/\s*/).pop();
        }

        function getAvailableTags() {
        	let words = [];
        	let lastInput = getLastInputWord();
        	console.log(lastInput, 'last input');

        		if(!Object.is(-1, getFirstWords().indexOf(lastInput))) {
        			words = getNextWord(lastInput);
                } else {// 这儿出错了
                	words = getFirstWords();
                }
                return words;
            }



        $( "#tags" )
	      // don't navigate away from the field on tab when selecting an item
	      .on( "keydown", function( event ) {
	      	if ( event.keyCode === $.ui.keyCode.TAB &&
	      		$( this ).autocomplete( "instance" ).menu.active ) {
	      		event.preventDefault();
	        }
	      })
	      .autocomplete({
	      	minLength: 0,
	      	source: function( request, response ) {
	          // delegate back to autocomplete, but extract the last term
	          response( $.ui.autocomplete.filter(
	          	getAvailableTags(), extractLast( request.term ) ) );
	      },
	      focus: function() {
	          // prevent value inserted on focus
	          return false;
	      },
	      select: function( event, ui ) {
	          // var terms = split( this.value );
	          var terms = this.value.split(" ");
	          // remove the current input
	          terms.pop();
	          // add the selected item
	          terms.push(ui.item.value);
	          // add placeholder to get the comma-and-space at the end
	          terms.push("");
	          this.value = terms.join(" ");
	          return false;
	      }
	  });

	      

	  } );

})

