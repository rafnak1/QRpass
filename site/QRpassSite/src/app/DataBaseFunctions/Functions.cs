void AddGuest (Guest guest){
    Dictionary<string, object> city = new Dictionary<string, object>
    {
        { "Name", "Tokyo" },
        { "Country", "Japan" }
    };
    DocumentReference addedDocRef = await db.Collection("cities").AddAsync(city);
    Console.WriteLine("Added document with ID: {0}.", addedDocRef.Id);
}
