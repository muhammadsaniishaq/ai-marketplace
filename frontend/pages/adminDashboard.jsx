import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Paper, List, ListItem, ListItemText, Button, Divider
} from '@mui/material';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const token = typeof window !== "undefined" ? localStorage.getItem('token') : '';

  // Fetchers...
  const fetchUsers = async () => { /* ... */ };
  const fetchProducts = async () => { /* ... */ };
  const fetchOrders = async () => { /* ... */ };
  const fetchAnalytics = async () => { /* ... */ };

  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchProducts();
      fetchOrders();
      fetchAnalytics();
    }
  }, [token]);

  const editUser = async (username) => { /* ... */ };
  const deleteUser = async (username) => { /* ... */ };
  const editProduct = async (id) => { /* ... */ };
  const deleteProduct = async (id) => { /* ... */ };
  const editOrder = async (id) => { /* ... */ };
  const deleteOrder = async (id) => { /* ... */ };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      {analytics && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Analytics</Typography>
          <Typography>Total Users: {analytics.totalUsers}</Typography>
          <Typography>Total Products: {analytics.totalProducts}</Typography>
          <Typography>Total Orders: {analytics.totalOrders}</Typography>
          <Typography>Total Sales: ${analytics.totalSales}</Typography>
          <Typography>Most Popular Product: {analytics.mostPopularProduct}</Typography>
        </Paper>
      )}

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Users</Typography>
        <List>
          {users.map(u => (
            <ListItem key={u.username} secondaryAction={
              <>
                <Button onClick={() => editUser(u.username)} variant="outlined" size="small" sx={{ mr: 1 }}>Edit</Button>
                <Button onClick={() => deleteUser(u.username)} variant="contained" color="error" size="small">Delete</Button>
              </>
            }>
              <ListItemText primary={u.username} secondary={u.role} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Products</Typography>
        <List>
          {products.map(p => (
            <ListItem key={p.id} secondaryAction={
              <>
                <Button onClick={() => editProduct(p.id)} variant="outlined" size="small" sx={{ mr: 1 }}>Edit</Button>
                <Button onClick={() => deleteProduct(p.id)} variant="contained" color="error" size="small">Delete</Button>
              </>
            }>
              <ListItemText primary={p.name} secondary={`$${p.price}`} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Orders</Typography>
        <List>
          {orders.map(o => (
            <ListItem key={o.id} secondaryAction={
              <>
                <Button onClick={() => editOrder(o.id)} variant="outlined" size="small" sx={{ mr: 1 }}>Edit</Button>
                <Button onClick={() => deleteOrder(o.id)} variant="contained" color="error" size="small">Delete</Button>
              </>
            }>
              <ListItemText primary={`${o.username} - ${o.status}`} secondary={`${o.items.length} items - ${o.date}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}