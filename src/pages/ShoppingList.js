import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, CircularProgress, Box, MenuItem, Select, Divider } from '@mui/material';
import CartButton from '../components/CartButton';
import '../ShoppingList.css'
import ProductCard from "../components/ProductCard";
import { fetchPublicGetApi} from "../services/fetchPublicApi";

const ShoppingList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // שליפת קטגוריות מה-API
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetchPublicGetApi('Categories/include');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);


    const filteredCategories = categories.filter((category) => {
        const filteredProducts = category.products.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
        return (
            filteredProducts.length > 0 &&
            (selectedCategory === '' || category.categoryId === Number(selectedCategory))
        );
    });

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                        Shopping List
                    </Typography>
                </Grid>
                {loading ? (
                    <Grid item xs={12} align="center">
                        <CircularProgress />
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                fullWidth
                                displayEmpty
                             >
                                <MenuItem value="">
                                    All Categories
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.categoryId} value={category.categoryId}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Search For Product"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Grid>
                        {filteredCategories.map((category, index) => (
                            <Grid item xs={12} key={category.categoryId}>
                                {index > 0 && <Divider sx={{ marginY: 3 }} />}
                                <Box
                                    sx={{
                                        backgroundColor: '#f0f0f0',
                                        padding: 2,
                                        borderRadius: 2,
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        align="center"
                                        sx={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {category.name}
                                    </Typography>
                                </Box>
                                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                    {category.products
                                        .filter((product) =>
                                            product.name.toLowerCase().includes(search.toLowerCase())
                                        )
                                        .map((product) => (
                                            <Grid item xs={12} sm={6} md={4} key={product.productId}>
                                                <ProductCard product={product} />
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>
                        ))}

                        {filteredCategories.length === 0 && (
                            <Grid item xs={12}>
                                <Typography align="center" variant="body1">
                                    No Products Found For This Search.
                                </Typography>
                            </Grid>
                        )}
                    </>
                )}
            </Grid>
            <Box
                className="cart-button"
                sx={{
                    position: 'fixed',
                    backgroundColor:'#1976d2',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                }}
            >
                <CartButton />
            </Box>
        </Box>
    );
};

export default ShoppingList;
