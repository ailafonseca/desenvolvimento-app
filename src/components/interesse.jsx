import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Interesse = (props) => (
  <Card className='interesseAltura margin'>
    <CardActionArea>
      <CardMedia
        image={props.imagem}
        className='cardInteresse'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {props.titulo}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p' className='justify'>
          {props.descricao}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button href={props.urlBotao} className={props.classNameBotao}>
           Ver trilhas
      </Button>
    </CardActions>
  </Card>
)

export default Interesse
