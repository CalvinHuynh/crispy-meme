import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicModel } from '../models/topic.model';

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(TopicModel)
        private readonly topicRepository: Repository<TopicModel>,
    ) { }

    async findAllTopics(): Promise<TopicModel[]> {
        return await this.topicRepository.find();
    }

    async findTopicById(tId: string): Promise<TopicModel>  {
        return await this.topicRepository.createQueryBuilder()
            .where('TopicId = :topicId', {topicId: tId})
            .getOne();
    }

    async findTopicsByCategory(topicCategory: string): Promise<TopicModel[]> {
        return await this.topicRepository.createQueryBuilder()
            .where('Category = :category', { category: topicCategory })
            .getMany();
    }

    async findTopicsByUser(uId: string): Promise<TopicModel[]> {
        return await this.topicRepository.createQueryBuilder()
            .where('topicStarterUserId = :userId', { userId: uId })
            .getMany();
    }

    async removeTopic(tId: string): Promise<TopicModel> {
        const topic = await this.topicRepository.createQueryBuilder()
            .where('TopicId = :topicId', { topicId: tId })
            .getOne();

        return await this.topicRepository.remove(topic);
    }

    async createTopic(topic: TopicModel): Promise<TopicModel> {
        const newTopic = new TopicModel({
            title: topic.title,
            category: topic.category,
            description: topic.description,
            topicStarter: topic.topicStarter,
        });
        return await this.topicRepository.save(newTopic)
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }

    async updateTopic(tId: string, topic: TopicModel): Promise<TopicModel> {
        const topicToUpdate =
            await this.topicRepository.createQueryBuilder()
                .where('TopicId = :topicId', { topicId: tId })
                .getOne();
        if (typeof topicToUpdate === 'object') {
            topicToUpdate.title = topic.title;
            topicToUpdate.category = topic.category;
            topicToUpdate.description = topic.description;
            topicToUpdate.updatedDate = new Date();
            topicToUpdate.posts = topic.posts;
            return await this.topicRepository.save(topicToUpdate);
        } else {
            return null;
        }
    }

    async deleteTopic(tId: string) {
        const topicToDelete =
            await this.topicRepository.createQueryBuilder()
                .where('TopicId = :topicId', { topicId: tId })
                .getOne();
        return await this.topicRepository.delete(topicToDelete);
    }
}