$(document).ready(function(){

	$( function() {

            function getFirstWords() { // get the 'firstWord' from content -- Array
            	let tmp = [];
            	for(let e of content)
            		tmp.push(e.firstWord);
            	return tmp;
            }

            function getNextWords() { 
            // get the 'nextWords' from content depending on the word in the input values -- Array
            	let tmp = [];          	
            	let wordInput = $.trim($("#tags").val());
            	let arr = wordInput.split(/\s+/);
            	let firstInput = arr[0];
           	 	for(let e of content) {
            		if(Object.is(firstInput, e.firstWord))
            		tmp = e.nextWords;
            	}

            	return tmp;
            }

            function getIndex(){
            	//get the number of the word 
            	let wordInput = $.trim($("#tags").val());
            	let arr = wordInput.split(/\s+/);
            	let value = $("#tags").val(); 
            	let valueArr = value.split(/\s+/);      	
            	let lastWordInput = valueArr.pop();
           		let index ;
           		if( Object.is(wordInput,"") ){
           			index = 0;
           		} else if( Object.is(lastWordInput , "" )){
           			index = arr.length;
           		} else {
           			index = arr.length-1;
           		}
           		return index;
            }

            function handleNextWords(index){
            	let nextWords = getNextWords();
            	let words=[];
            	if(index <= nextWords.length ){
            		words = nextWords[index-1];
            	}
            	return words;
            }


        function getAvailableTags() {
        	//get 'source'
        	let words = [];
        	let index = getIndex();
        	/*console.log(index, 'index');*/

        		if(index == 0 ) {
        			words = getFirstWords();
        			/*console.log(words);*/
                } else {
                	words = handleNextWords(index);
                	/*console.log(words);*/
                }

                return words;
            }

        function split( val ) {
	      return val.split( / \s*/ );
	    }
	    function extractLast( term ) {
	      return split( term ).pop();
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
	          /*terms.push("");*/
	          this.value = terms.join(" ");
	          return false;
	      }
	  });

	      

	  } );

})

