
<% if (items.length > 0) { %>
            <% items.forEach(item => { %>
<% if(!item.today.imgg.img1.description) { %>

                    <img src="data:<%= item.today.imgg.img.contentType %>;base64,<%= item.today.imgg.img.data.toString('base64') %>"/>
<p><%= item.address %><br><%= item.today.imgg.img.description %></p>





<% } else { %>
                    <img src="data:<%= item.today.imgg.img.contentType %>;base64,<%= item.today.imgg.img.data.toString('base64') %>"/>
<p><%= item.address %><br><%= item.today.imgg.img.description %></p>
<img src="data:<%= item.today.imgg.img1.contentType %>;base64,<%= item.today.imgg.img1.data.toString('base64') %>"/>
<p><%= item.address %><br><%= item.today.imgg.img1.description %></p>



 

<% } %>
<% }); %>
        <% } %>
