import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import express, { Request, Response } from 'express';
import { productRouter } from './routes/productRoutes';
import { userRouter } from './routes/userRoutes';
import { orderRouter } from './routes/orderRoutes';
import { dashboardRouter } from './routes/dashboardRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/dashboard', dashboardRouter);

app.listen(3000, () => {
	console.log('server is listening on port 3000');
});

app.get('/', function (req: Request, res: Response) {
	res.send('Hello World!');
});
