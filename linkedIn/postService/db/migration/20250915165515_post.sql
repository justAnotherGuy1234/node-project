-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS Post(
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    content TEXT NOT NULL,
    images JSON,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
DROP TABLE IF EXISTS Post;
-- +goose StatementEnd
