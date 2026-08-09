# Error Handling
* Technical/Network Errors
  * MongoDB Server is down
  * Show error page to the user
* Expected Errors
  * File can't be read, database operation fails
  * Inform user, possibly retry
* Bugs/Logical Errors
  * User object used when it does not exist
  * Fix during developent

## Working with Errors
* Error is thrown
  * Synchronous Code: try-catch
  * Asynchronous Code
    * then() - catch()
  * Directly handle error
  * Using Express error handling function
* No Error is thrown
  * Validate values
    * Decide if
      * Throw error
      * Directly handle error

Error Page (e.g 500 page).  
Response Page with error information.  
Redirect.  

