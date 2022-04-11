import * as React from 'react'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

export default function ProductCard() {
  return (
    <Card>
      <CardMedia
        component="img"
        height="100"
        image="/path/to/img"
        alt="product image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="text.secondary">
          Product
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a description of the product
        </Typography>
      </CardContent>

      <CardActions>
        <Typography>Add to Cart</Typography>
        <IconButton color="primary" aria-label="add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}