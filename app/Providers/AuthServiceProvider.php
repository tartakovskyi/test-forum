<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;
use App\Models\Post;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        if (! $this->app->routesAreCached()) {
            Passport::routes();
        }

        Gate::define('creator-or-admin', function ($user, $entity) {
            return $user->id === $entity->user_id || $user->role_id === 1;
        });

        Gate::define('no-replies', function ($user, $postId) {
            return (!Post::where('parent_id', $postId)->count() || $user->role_id === 1);
        });

        $this->registerPolicies();
    }
}
