High Performance GraphQL with DataLoader
========================

* Speaker   : Barak Chamo
* Available : Any
* Length    : 30 mins

Description
-----------

GraphQL is awesome, no doubt about it. Along with Relay, it’s one of the most exciting developments in web in recent years. Yet, while it provides a fresh paradigm and potential significant improvements to web APIs, many who have built “real world” applications with it have inevitably come across one significant performance drawback. 

When building complex graph queries with nested we end up running many repeat DB calls that slow down our responses. Imagine getting a list of 10 events and the creator of each one, we'll have to query for users for each event we fetch and optimizing these calls becomes tricky and convoluted, that's a whopping 11 queries in one request!

Enter DataLoader. While not as popular as other Facebook open-source projects like React or GraphQL, DataLoader is an essential piece of the GraphQL puzzle and is exactly what we need to build a high-performance GraphQL-driven backend.

Through caching, batching and JS event-loop trickery DataLoader coalesces data operations in  the graph and significantly reduces the number of queries run for each request. Instead of querying for individual assets we query for batches sets. Our example from before will boil 
down from 11 to only 2 DB calls!

Covering the internals we'll understand how DataLoader uses Node's event loop to coalesce all calls in a request and how to easily use it in our GQL projects to improve their performance.


---------------


Speaker Bio
-----------

I'm a London-based software engineeer, entrepreneur and creative coder. 
I enjoy building cool things with JavaScript and playing with the art and tech.


Links
-----

* Company: http://www.rokk3rlabs.com/
* Github: http://github.com/BarakChamo
