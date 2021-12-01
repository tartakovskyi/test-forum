<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'text' => $this->faker->realText($maxNbChars = 300, $indexSize = 3),
            'thread_id' => 0,
            'user_id' => 0
        ];
    }
}
