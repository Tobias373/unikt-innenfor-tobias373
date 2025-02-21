<!DOCTYPE html>

<html lang="no">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Brukere</title>

</head>

<body>

<h1>Liste over brukere</h1>

<ul>

<%

// Går gjennom hvert element (bruker) i 'users'-arrayet

users.forEach(user => {

%>

<!-- Oppretter et listeelement for hver bruker, og viser navn og e-post -->

<li><%= user.name %> - <%= user.email %></li>

<%

// Avslutter forEach-løkken

})

%> </ul>

</body>

</html>