package by.pilleo.trackertest.repository;

import by.pilleo.trackertest.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.Instant;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndCreatedDateBefore(Instant dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmailIgnoreCase(String email);
    @Query("select user from User user left join fetch user.authorities auth left join fetch user.comments comments left join fetch user.projects projects left join fetch user.tasks tasks where user.login=:login")

    Optional<User> findOneByLogin(@Param("login") String login);

    @EntityGraph(attributePaths = "authorities")
    User findOneWithAuthoritiesById(Long id);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByLogin(String login);

    Page<User> findAllByLoginNot(Pageable pageable, String login);
    @Query("select user from User user left join fetch user.authorities auth left join fetch user.comments comments left join fetch user.projects projects left join fetch user.tasks tasks where user.id=:id")
    User findOneWithEager(@Param("id") Long id);
}
