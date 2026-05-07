<?php
<!-- filepath: /home/hizaki/Documents/WWW/hizakilabs/home.php -->
<?php
// home.php - A simple PHP file that includes the main index.html for server-side rendering or dynamic content
// This ensures compatibility with PHP environments while maintaining the static HTML structure

// Set content type and headers for proper rendering
header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Include the main index.html file
readfile('index.html');

// Optional: Add dynamic PHP content here if needed (e.g., server-side analytics or user-specific data)
// For now, it's a direct include for simplicity and consistency
?>
