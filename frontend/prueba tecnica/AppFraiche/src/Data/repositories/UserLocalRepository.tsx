
import { Product } from '../../Domain/entities/Product';
import { User } from '../../Domain/entities/User';
import { UserLocalRepository } from '../../Domain/repositories/UserLocalRepository';
import { LocalStorage } from '../sources/local/LocalStorage';

export class UserLocalRepositoryImpl implements UserLocalRepository {

    async save(user: User): Promise<void> {
        const { save } = LocalStorage();
        await save('user', JSON.stringify(user));
    }

  
    async saveProduct(product: Product): Promise<void> {
        const { savePro } = LocalStorage();
        await savePro('product', JSON.stringify(product));
    }


   
    async getUser(): Promise<User> {
        const { getItem } = LocalStorage();
        const data = await getItem('user');
        const user: User = JSON.parse(data as any);
        return user;
    }

 

    async getProduct(): Promise<Product> {
        const { getItemPro } = LocalStorage();
        const data = await getItemPro('product');
        const product: Product = JSON.parse(data as any);
        return product;
    }

    async remove(): Promise<void> {
        const { remove } = LocalStorage();
        await remove('user');
    }

    async removeOrder(): Promise<void> {
        const { remove } = LocalStorage();
        await remove('order');
    }
    
    async removeProduct(): Promise<void> {
        const { remove } = LocalStorage();
        await remove('product');
    }
}